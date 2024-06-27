import { connect } from 'mongoose'

export default defineNitroPlugin(async () => {
  const
    {
      hostDB,
      nameDB,
      userDB,
      passDB
    } = useRuntimeConfig(),
    uri = `mongodb+srv://${ userDB }:${ passDB }@${ hostDB }/${ nameDB }?retryWrites=true&w=majority`;

  try {
    await connect(uri);
    console.log('Successfully connected to MongoDB');
  } catch (e) {
    console.error(e);
  }
})
