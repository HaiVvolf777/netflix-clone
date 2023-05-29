
import background from '../assets/login.jpg'

const BackgroundImg = () => {
  return (
<div className='h-[100vh] ' >
 
    <img className='h-[100vh] w-[100vw] object-cover' src={background} alt="Background" />
</div>
  )
}

export default BackgroundImg