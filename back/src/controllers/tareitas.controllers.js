let tareitas = [];
let codigo = 1;

exports.getTareitas = (req, res) => {
  res.json(tareitas);
};

exports.createTareitas = (req, res) => {
  const { titulo } = req.body;

  if (!titulo || typeof titulo !== 'string' || !titulo.trim()) {
    return res.status(400).json({ 
      error: 'El campo "titulo" es obligatorio y debe ser un texto válido.' 
    });
  }

  if (titulo.length > 100) {
    return res.status(400).json({ 
      error: 'El título no debe superar los 100 caracteres.' 
    });
  }

  const newTareita = {
    codigo: codigo++,
    titulo: titulo.trim()
  };

  tareitas.push(newTareita);

  res.status(201).json(newTareita);
};

exports.deleteTareita = (req, res) => {
  const tareitaId = parseInt(req.params.codigo);

  if (isNaN(tareitaId)) {
    return res.status(400).json({
      error: 'El código de la tarea debe ser un número válido.'
    });
  }

  const existe = tareitas.some(t => t.codigo === tareitaId);

  if (!existe) {
    return res.status(404).json({
      error: `No existe una tarea con el código ${tareitaId}.`
    });
  }

  tareitas = tareitas.filter(t => t.codigo !== tareitaId);

  res.status(200).json({
    message: `La tarea con código ${tareitaId} se eliminó correctamente.`
  });
};