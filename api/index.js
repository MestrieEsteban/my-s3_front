import axios from 'axios'
export default {
  auth: {
    me: () => axios.get(''),
    login: (data) => axios.post('authenticate/signin', data),
    register: (data) => axios.post('authenticate/signup', data),
    getBucket: (data) => {
      console.log(data)
      axios.get(`/:uuid/buckets`, data)
    },
  },
}
