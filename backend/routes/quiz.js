const express = require('express');
const quizzes = require('../data/quizzes');
const { 
  getAgent, 
  updateAgent,
  getQuizProgress,
  updateQuizProgress,
  addQuizScore
} = require('../data/gameState');

const router = express.Router();

// GET /api/quiz/:district_slug - Get all questions for a district (WITHOUT answers)
router.get('/:district_slug', (req, res) => {
  try {
    const { district_slug } = req.params;
    
    const districtQuizzes = quizzes[district_slug];
    
    if (!districtQuizzes) {
      return res.status(404).json({
        success: false,
        error: 'District not found',
        message: `No quizzes found for district: ${district_slug}`
      });
    }
    
    // Return questions WITHOUT answers
    const questions = districtQuizzes.map(q => {
      const question = {
        id: q.id,
        question: q.question,
        type: q.type,
        mesh_reward: q.mesh_reward
      };
      
      // Include options for multiple choice
      if (q.type === 'multiple_choice') {
        question.options = q.options;
      }
      
      // Don't include answer or keywords
      return question;
    });
    
    res.json({
      success: true,
      district_slug,
      questions,
      total: questions.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: error.message
    });
  }
});

// POST /api/quiz/:district_slug/answer - Submit an answer
router.post('/:district_slug/answer', (req, res) => {
  try {
    const { district_slug } = req.params;
    const { agent_id, question_id, answer } = req.body;
    
    if (!agent_id || !question_id || answer === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        message: 'Please provide agent_id, question_id, and answer'
      });
    }
    
    const agent = getAgent(agent_id);
    if (!agent) {
      return res.status(404).json({
        success: false,
        error: 'Agent not found'
      });
    }
    
    const districtQuizzes = quizzes[district_slug];
    if (!districtQuizzes) {
      return res.status(404).json({
        success: false,
        error: 'District not found'
      });
    }
    
    const question = districtQuizzes.find(q => q.id === question_id);
    if (!question) {
      return res.status(404).json({
        success: false,
        error: 'Question not found',
        message: `No question with id ${question_id} in district ${district_slug}`
      });
    }
    
    // Check if already answered
    const progress = getQuizProgress(agent_id, district_slug);
    if (progress.answered.includes(question_id)) {
      return res.status(400).json({
        success: false,
        error: 'Already answered',
        message: 'You have already answered this question'
      });
    }
    
    let correct = false;
    let meshEarned = 0;
    let explanation = '';
    
    // Check answer based on question type
    if (question.type === 'multiple_choice') {
      correct = parseInt(answer) === question.answer;
      explanation = correct 
        ? `Correct! The answer is: ${question.options[question.answer]}`
        : `Incorrect. The correct answer is: ${question.options[question.answer]}`;
    } else if (question.type === 'true_false') {
      const userAnswer = typeof answer === 'string' 
        ? answer.toLowerCase() === 'true' 
        : !!answer;
      correct = userAnswer === question.answer;
      explanation = correct
        ? `Correct! The answer is ${question.answer}`
        : `Incorrect. The correct answer is ${question.answer}`;
    } else if (question.type === 'open_ended') {
      // Check if answer contains any of the keywords (case insensitive)
      const answerLower = String(answer).toLowerCase();
      const matchedKeywords = question.keywords.filter(keyword => 
        answerLower.includes(keyword.toLowerCase())
      );
      
      // Consider correct if at least 2 keywords are present, or 1 if there are only 1-2 keywords total
      const requiredMatches = question.keywords.length <= 2 ? 1 : 2;
      correct = matchedKeywords.length >= requiredMatches;
      
      if (correct) {
        explanation = `Good answer! Key concepts identified: ${matchedKeywords.join(', ')}`;
      } else {
        explanation = `Your answer needs more detail. Consider these concepts: ${question.keywords.join(', ')}`;
      }
    }
    
    // Award MESH and XP if correct
    if (correct) {
      meshEarned = question.mesh_reward;
      const xpEarned = Math.floor(question.mesh_reward / 2);
      
      updateAgent(agent_id, {
        mesh_balance: agent.mesh_balance + meshEarned,
        xp: agent.xp + xpEarned
      });
      
      addQuizScore(agent_id, district_slug, meshEarned);
    }
    
    // Update progress
    updateQuizProgress(agent_id, district_slug, question_id, correct);
    
    // Check if all questions answered - unlock ability
    const updatedProgress = getQuizProgress(agent_id, district_slug);
    const allAnswered = updatedProgress.answered.length === districtQuizzes.length;
    const abilitiesUnlocked = [];
    
    if (allAnswered && !agent.abilities.includes(district_slug)) {
      const newAbilities = [...agent.abilities, district_slug];
      updateAgent(agent_id, {
        abilities: newAbilities
      });
      abilitiesUnlocked.push({
        district: district_slug,
        ability: `${district_slug.toUpperCase()} Mastery`,
        description: `You have mastered all concepts in ${district_slug}`
      });
    }
    
    res.json({
      success: true,
      correct,
      mesh_earned: meshEarned,
      xp_earned: correct ? Math.floor(question.mesh_reward / 2) : 0,
      explanation,
      abilities_unlocked: abilitiesUnlocked,
      progress: {
        answered: updatedProgress.answered.length,
        total: districtQuizzes.length,
        score: updatedProgress.score
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: error.message
    });
  }
});

// GET /api/quiz/:district_slug/progress/:agent_id - Get quiz progress
router.get('/:district_slug/progress/:agent_id', (req, res) => {
  try {
    const { district_slug, agent_id } = req.params;
    
    const agent = getAgent(agent_id);
    if (!agent) {
      return res.status(404).json({
        success: false,
        error: 'Agent not found'
      });
    }
    
    const districtQuizzes = quizzes[district_slug];
    if (!districtQuizzes) {
      return res.status(404).json({
        success: false,
        error: 'District not found'
      });
    }
    
    const progress = getQuizProgress(agent_id, district_slug);
    const totalQuestions = districtQuizzes.length;
    const answeredCount = progress.answered.length;
    const correctCount = (progress.correct_answers || []).length;
    const completed = answeredCount === totalQuestions;
    const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
    
    res.json({
      success: true,
      district_slug,
      progress: {
        answered_questions: progress.answered,
        correct_answers: progress.correct_answers || [],
        total_questions: totalQuestions,
        answered_count: answeredCount,
        correct_count: correctCount,
        score: progress.score,
        accuracy: accuracy,
        completed,
        ability_unlocked: agent.abilities.includes(district_slug)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: error.message
    });
  }
});

module.exports = router;
