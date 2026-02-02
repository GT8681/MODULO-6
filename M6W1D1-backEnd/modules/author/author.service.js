const AuthorSchema = require('./author.schema');

const getAuthors = async () => {
    const users = await AuthorSchema.find();
    return users;

}


const getAuthorId = async (userId) => {
    const users = await AuthorSchema.findById(userId);
    return users;

}

const createAuthor = async (body) => {
    const newAuthor = new AuthorSchema(body)
    const saveUser = newAuthor.save()
    return saveUser;

}

const updateAuthor = async (userId, body) => {
    const options = {new:true}
    return await AuthorSchema.findByIdAndUpdate(userId, body, options)
}

const deleteAuthor = async (userId) => {
    return await AuthorSchema.findByIdAndDelete(userId)
}


module.exports = {
    getAuthors,
    getAuthorId,
    createAuthor,
    updateAuthor,
    deleteAuthor

}