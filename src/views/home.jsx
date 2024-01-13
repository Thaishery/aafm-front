import Slider from "../componant/Sliders/slider"

const Home = ()=>{
  return(
    <>
      <p>Hello world all</p>
      <Slider slides={[
        {
          src:"https://picsum.photos/id/1/100/300",
          alt:"alt img1",
          havecaptions:false
        },
        {
          src:"https://picsum.photos/id/2/100/300",
          alt:"alt img2",
          havecaptions:true,
          title:"mon 2eme titre",
          desc:"ma description"
        },
        {
          src:"https://picsum.photos/id/3/100/300",
          alt:"alt img2",
          havecaptions:true,
          title:"mon 3eme titre",
          desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et egestas quis ipsum suspendisse. Duis at consectetur lorem donec massa sapien. Vivamus at augue eget arcu. Dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Arcu bibendum at varius vel pharetra. Iaculis nunc sed augue lacus viverra vitae congue. Porttitor massa id neque aliquam vestibulum morbi blandit cursus risus. Quis imperdiet massa tincidunt nunc pulvinar. Ultrices gravida dictum fusce ut placerat orci nulla. Semper viverra nam libero justo. Mauris vitae ultricies leo integer malesuada nunc vel risus. At auctor urna nunc id cursus metus aliquam. Elementum integer enim neque volutpat ac tincidunt vitae semper quis. Natoque penatibus et magnis dis parturient. Ultrices tincidunt arcu non sodales neque sodales. Aliquam eleifend mi in nulla posuere sollicitudin."
        },
        {
          src:"https://picsum.photos/id/4/100/300",
          alt:"alt img2",
          havecaptions:true,
          title:"mon 4eme titre",
          desc:"ma description"
        }
        ]}/>
    </>
  )
}
export default Home