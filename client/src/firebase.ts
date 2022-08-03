import { initializeApp } from "firebase/app"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCutQ6VmQ4hlOq4qiy0ZRNWvr8KW4DiqIU",
  authDomain: "yummy-web-4a730.firebaseapp.com",
  projectId: "yummy-web-4a730",
  storageBucket: "yummy-web-4a730.appspot.com",
  messagingSenderId: "85820679301",
  appId: "1:85820679301:web:c7fdcd1aaa304fa12875ec",
}

const firebase_app = initializeApp(firebaseConfig)
export const storage = getStorage(firebase_app)

export default firebase_app
