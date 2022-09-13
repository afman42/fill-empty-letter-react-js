import { useEffect, useRef, useState } from "react";

export default function PlayGame({ data, setStartEnable, setCountStart }) {
    let inputRef = useRef(null);
    let [refActive, setRefActive] = useState(0)
    let [filtered, _] = useState(data[Math.floor(Math.random() * data.length)]);
    let [arr, setArr] = useState([]);
    let textLength = new Array(filtered.nameField.length).fill("");
    const [toggleWinOrLose, setToggleWinOrLose] = useState({
        result: '',
        bool: true
    });

    function changeInput(e) {

        if (e.code === 'Space' || e.code === 'Tab') {
            e.preventDefault();
            return false;
        } else if (e.code === "Backspace") {
            if (refActive == 0) {
                setRefActive(0);
                arr = []
                setArr([...arr])
            } else {
                setRefActive(refActive - 1)
                let indexValue = arr.indexOf(e.target.value);
                arr[refActive] = arr.splice(indexValue, 1);
                setArr([...arr])
            }
        } else {
            if (filtered.nameField.length == refActive) {
                return false
            } else {
                setRefActive(refActive + 1)
                arr[refActive] = e.target.value
                setArr([...arr])
            }
        }
        console.log(arr)
    }

    useEffect(() => {
        inputRef.current?.focus()
    }, [refActive, filtered])

    function handleSubmit(event) {
        event.preventDefault();
        let joinArr = arr.join('');
        if (joinArr.toLowerCase() === filtered.nameField.toLowerCase()) {
            toggleWinOrLose.result = 'Menang';
        } else {
            toggleWinOrLose.result = 'Kalah';
        }
        toggleWinOrLose.bool = false
        setToggleWinOrLose(_ => ({ ...toggleWinOrLose }));
    }

    return (
        <div className="containerPlayGame">
            {toggleWinOrLose.bool ? (
                <div className="divForm">
                    <p>Urut dari kiri ke kanan</p>
                    <form onSubmit={handleSubmit}>
                        <div className="buttonGroup">
                            <input type="reset" defaultValue="Reset" onClick={() => {
                                setArr([]);
                                setRefActive(0);
                            }} />
                            <button disabled={arr.length === filtered.nameField.length ? false : true} type="submit">Save</button>
                        </div>
                        <div className="divInput">
                            {textLength.map((_, index) => (
                                <input
                                    type='text'
                                    key={index}
                                    onKeyUp={(e) => changeInput(e)}
                                    ref={index === refActive ? inputRef : null}
                                    className="inputPlayGame"
                                    maxLength="1"
                                    style={{ marginRight: index + 1 === textLength.length ? '0px' : '10px' }}
                                />
                            ))}
                        </div>

                    </form>

                    <div className="divKisi">
                        {filtered.kisi.map((item) => (
                            <div key={item}> - {item} &nbsp;</div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    <div>{arr.join('')} : {filtered.nameField}</div>
                    <div>{toggleWinOrLose.result}</div>
                    <button onClick={() => {
                        setStartEnable(false);
                        setCountStart(3);
                    }} className='buttonStart'>Kembali</button>
                </div>
            )}
        </div>
    )
}