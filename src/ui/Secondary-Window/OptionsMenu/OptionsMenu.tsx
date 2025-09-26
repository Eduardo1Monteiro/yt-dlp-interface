import 'OptionsMenu.css';

function OptionsMenu(props: { title: string, link: string, thumbnail: string }) {
  function handleClick(option: number) {
    (window as any).electronAPI.downloadContent(props.link, option)
      .then((msg: string) => {
        console.log(msg);
      })
      .catch((err: string) => {
        console.error(err);
      });
  }

  return (
    <div className='options-container'>
      <button onClick={() => handleClick(0)}> Donwload as Video </button>
      <button onClick={() => handleClick(1)}> Download as Music </button>
    </div>
  )
}

export default OptionsMenu;
