
const filterArrayBySearchKeyword = (searchKeyword, itemListArr, primaryKey) => {
    var result = [];
    var matchedKey = [];
    itemListArr.map (function(num) {
        var values = Object.values(num);
        var joinedString = values.join(',');
        joinedString = joinedString.toLowerCase() //리스트 문자열 합친걸 모두 소문자화
        searchKeyword = searchKeyword.toLowerCase() //검색어를 모두 소문자화
        searchKeyword = searchKeyword.replace(/\s*$/,''); //마지막 공백을 모두 제거
        // var spaceCount = (code.split(" ").length - 1); //중간에 들어간 공백의 숫자

        let codeArray = searchKeyword.split(' ')
        let matchedTrue = ''
        for(let i=0, k = 0; i < codeArray.length; i++) {
        var trueSearched = joinedString.indexOf(codeArray[i]) > - 1;
        if (trueSearched === true) {
            k = k + 1
        }
        if (k === codeArray.length) {matchedTrue = true} //공백으로 나눠진 단어 모두가 검색되는지를 true여부로 반환
        else {matchedTrue = false} 
        }
        if (matchedTrue === true) {
        matchedKey.push(num[primaryKey]);   //matchedKey라는 미리 선언된 배열변수에, 검색어를 포함한 아이템들의 id값만 담음.
        }
    })
    console.log(matchedKey)

    var returnWords = function(){
        var matchedData = [];
        var findDataId = '';
        matchedKey.map(key => {
            console.log(key)
            itemListArr.map(obj => {
                if (obj[primaryKey] === key)
                {
                    matchedData.push(obj)
                }
            })
        })
        return matchedData;
    }
    console.log(returnWords())
    return returnWords();
}
export default filterArrayBySearchKeyword