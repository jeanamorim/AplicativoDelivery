import File from '../models/File';

class FileController {
  async store(req, res) {
    const { key: path, originalname: name, size, location: url } = req.file;

    const response = await File.create({
      name,
      path,
      size,
      url,
    });
    return res.json(response);
  }
}

export default new FileController();
