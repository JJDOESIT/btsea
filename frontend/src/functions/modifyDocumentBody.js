export default function modifyDocumentBody(height_one,height_two,height_three){
  const height =
    document.querySelector(height_one).clientHeight -
    document.querySelector(height_two).clientHeight;
  document.querySelector(height_three).style.height = height + "px";
}
