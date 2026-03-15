const sourceService = require('./source.service');

exports.createSource = async (req, res) => {
    try {
        const source = await sourceService.createSource(req.body);

        res.status(201).json(source);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create source' });
    }
};