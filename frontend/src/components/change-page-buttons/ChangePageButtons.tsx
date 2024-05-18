import Button from "react-bootstrap/Button";
import './ChangePageButtons.scss';
import fetchSettings from "../../interfaces/fetchSettings";
import { useQuery } from "react-query";
import fetchPageMaxNum from "../../utils/fetchPageMaxNum";

function ChangePageButtons(props: {settings: fetchSettings, setSettings: React.Dispatch<React.SetStateAction<fetchSettings>>}) {
  const { data: pageMaxNum } = useQuery<number>('pageMaxNum', fetchPageMaxNum);

  const changePageNum = (n: number) => {
    let num = props.settings.pageNum + n;
    if (pageMaxNum && num >= 0 && num < pageMaxNum) {
      props.setSettings(prevSettings => ({
        ...prevSettings,
        pageNum: num
      }));
    }
  };

  return (
    <div className="page-change-buttons-container">
        <Button 
          className="page-change-button"
          variant="outline-primary"
          onClick={() => changePageNum(-props.settings.pageNum)}
        >
          First
        </Button>
        <Button 
          className="page-change-button"
          variant="outline-primary"
          onClick={() => changePageNum(-1)}
        >
          Prev
        </Button>
        <Button variant="outline-primary" disabled>
          {pageMaxNum &&
            `${props.settings.pageNum + 1} / ${pageMaxNum}`
          }
        </Button>
        <Button 
          className="page-change-button"
          variant="outline-primary"
          onClick={() => changePageNum(1)}
        >
          Next
        </Button>
        <Button 
          className="page-change-button"
          variant="outline-primary"
          onClick={() => {
            if (pageMaxNum) {
              let num = pageMaxNum - props.settings.pageNum - 1;
              changePageNum(num);
            }
          }}
        >
          Last
        </Button>
    </div>
  )
}

export default ChangePageButtons