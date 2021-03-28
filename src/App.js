import './App.css'


import { VerticalCarousel } from './components/VerticalCarousel/VerticalCarousel'

// const data = [
//   {
//     image: 'images/1.jpg',
//   },
//   {
//     image: 'images/2.jpg'
//   },
//   {
//     image: 'images/3.jpg'
//   }
// ]

const images = [
  {
    id: 1, //or uuuidv4 
    image: ['images/1.jpg'],
    section:[]
  },
  {
    id: 2, 
    image: ['images/2.jpg'],
    section:[]
  },
  {
    id: 2, 
    image: ['images/3.jpg', 'images/4.jpg', 'images/5.jpg'],
    section: [
      // {
      //   id: 1,
      //   image: 'images/4.jpg',
      // },
      // {
      //   id: 2,
      //   image: 'images/5.jpg',
      // },
      // {
      //   id: 3,
      //   image: 'images/6.jpg',
      // },
    ]
  }
]

function App() {


  return (
    <>
      <VerticalCarousel data={images} />

    </>
  );
}

export default App;
