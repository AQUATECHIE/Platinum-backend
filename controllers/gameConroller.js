import axios from 'axios';
import { GAME_PROVIDER_API, API_KEY } from '../config/config.js';

export const startGame = async (req, res) => {
    const { gameId } = req.query;

    try {
        const response = await axios.post(
            GAME_PROVIDER_API,
            {
                userId: req.user.id, // Use authenticated user's ID
                gameId,
            },
            {
                headers: { Authorization: `Bearer ${API_KEY}` },
            }
        );

        const { gameUrl } = response.data; // Extract game URL from API response
        res.json({ gameUrl });
    } catch (error) {
        console.error('Error starting game:', error.message);
        res.status(500).json({ error: 'Failed to start game' });
    }
};

