import mongoose from 'mongoose'

export async function configDatabase(uri){
    try {
       await  mongoose.connect(uri)
       console.log('Database is succsefuly connected!');
    } catch (error) {
        throw Error(`Can't connect to the database!`)
    }
}