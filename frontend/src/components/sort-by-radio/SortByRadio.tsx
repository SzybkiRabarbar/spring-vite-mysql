import { useEffect, useState } from "react";
import { ButtonGroup, Col, Row, ToggleButton } from "react-bootstrap";
import fetchSettings from "../../interfaces/fetchSettings";
import { PAGE_SIZE } from "../../utils/consts";

function SortByRadio(props: {setSettings: React.Dispatch<React.SetStateAction<fetchSettings>>}) {
  const [checked, setChecked] = useState(true);
  const [radioValue, setRadioValue] = useState('productName');

  const radios = [
    { name: 'Name', value: 'productName' },
    { name: 'Rating', value: 'rating' },
    { name: 'Reviews', value: 'reviews' },
  ];

  useEffect(() => props.setSettings(
    {
      pageNum: 0,
      pageSize: PAGE_SIZE,
      sortBy: radioValue,
      desc: checked,
    }
  ), [radioValue, checked])

  return (
    <div className="width-100%">
      <Row><Col>
      <ButtonGroup className="mb-2 w-100">
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant="outline-primary"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
            className="w-100"
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <ButtonGroup className="mb-2 w-100">
        <ToggleButton
          id="toggle-check"
          type="checkbox"
          variant="outline-primary"
          checked={checked}
          value="1"
          onChange={(e) => setChecked(e.currentTarget.checked)}
        >
          {checked
          ?
            <div>Descending</div>
          :
            <div>Ascending</div>
          }
        </ToggleButton>
      </ButtonGroup>
      </Col></Row>
    </div>
  )
}

export default SortByRadio