# CardFlip-Progress

## CardFlip
react-card-flip을 이용하여 구현했다.  
사용을 위해선 isFlipped와 flipDirection을 지정해야 하며  
두개의 컴포넌트가 필수적으로 들어가야 한다. (더 많아도 안됨)  

```javascript
  <CardFlip isFlipped={!buttonClick} flipDirection="horizontal">
      <div className="front">
          //이곳에 앞면 컴포넌트를 작성
      </div>
      <div className="back">
          //이곳에 뒷면 컴포넌트를 작성
      </div>
  </CardFlip>
```

## Progress(Ant Design)
ant design의 progress 컴포넌트를 사용했다.  
material-ui와 다르게 linear-gradient를 적용할 수 있다는 점이 흥미로웠다.

```javascript
    <Progress
        type="circle"
        percent={maxNumber * easing(number / maxNumber)}
        status="active"
        strokeColor={{ '0%': '#ffe200', '100%': '#ff0000' }}
        format={() => `${number}%`}
        width={80}
    />
```

### 발견한 문제
처음에는 material-ui의 progress 컴포넌트를 사용하려 했으나  
percent가 유동적으로 변하는 부분에서 버그가 발생했다.  
따라서 ant design의 progress 컴포넌트로 대체하였는데  
오히려 material-ui보다 더 활용도가 높은 것 같다.  

아래코드는 progress 퍼센트가 유동적으로 변하는 부분의 코드이다.

```javascript
    useEffect(() => {
        const increase = () => {
            return setTimeout(() => {
                const copyNumber = number.slice();
                copyNumber.forEach((num, index) => {
                    if (num < maxNumber[index])
                        copyNumber.splice(index, 1, num + maxNumber[index] / 100);
                });
                setNumber(copyNumber);
            }, 10);
        };
        const decrease = () => {
            return setTimeout(() => {
                const copyNumber = number.slice();
                copyNumber.forEach((num, index) => {
                    if (num > 0) copyNumber.splice(index, 1, num - maxNumber[index] / 100);
                });
                setNumber(copyNumber);
            }, 10);
        };

        if (buttonClick && maxNumber[1] > number[1]) increase();
        else if (!buttonClick && number[1] !== 0) decrease();

        return () => {
            if (buttonClick) clearTimeout(increase);
            else clearTimeout(decrease);
        };
    }, [number, maxNumber, buttonClick]);
```

여러 개의 값을 입력받기 위해선 배열을 사용해야 했다.  
이를 위해 코드를 배열에 맞게 수정하고 useEffect 에러를 고치기 위해 useMemo를 사용했다.  
아직 useMemo에 대한 이해를 완벽히 하지 못해 더 알아보고 어떤 식으로 동작하는 지 이해할 필요가 있다.  
