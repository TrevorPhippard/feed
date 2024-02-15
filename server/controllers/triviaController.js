import Trivia from '../models/trivia.model';


// add Trivia output: { Trivia, channel, Trivia }
export const addTrivia = async (req, res ) => {

    const { gameName, slides, user_id } = req.body
    //Build the Trivia object to write to database
    let  newTrivia = { gameName, slides, user_id } 

    Trivia.create(newTrivia)
        .then(savedTrivia => {
            res.status(200).json({ status: "Success", new_trivia_id: savedTrivia.id });
        })
        .catch(err => res.status(500).send(err.trivia));
}

// getting all Trivias
export const getAllTrivias = async (req, res) => {
    try {
        const trivias = await Trivia.findAll();
        res.json(trivias);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


// Controller for getting a Trivia by ID
export const getTriviaById = async (req, res) => {
    try {
        const triviaId = Number(req.params.id.split(':')[1]);
        const trivia = await Trivia.findByPk(triviaId);
        if (!Trivia) {
            res.status(404).send('trivia not found');
        } else {
            res.json(trivia);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


// updating a Trivia
export const updateTriviaById = async (req, res) => {
    try {
        const triviaId = Number(req.params.id.split(':')[1]);
        const { id, gameName, slides, user_id } = req.body;
        const trivia = await Trivia.findByPk(triviaId);
        if (!trivia) {
            res.status(404).send('Trivia not found');
        } else {
            trivia.id = id,
            trivia.gameName = gameName,
            trivia.slides = slides,
            trivia.user_id = user_id
            await trivia.save();
            res.json({ Trivia: 'Trivia updated successfully', Trivia: trivia });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


// deleting a Trivia by ID
export const removeTriviaByTrivia = async (req, res) => {
    try {
        const triviaId = req.params.trivia;
        const trivia = await Trivia.findByPk(triviaId);
        if (!trivia) {
            res.status(404).send('Trivia not found');
        } else {
            await trivia.destroy();
            res.send('Trivia deleted successfully');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};