let mathQuery ='';//do not change manually 
let result =0;//do not change manually

//this function will present an mathematical query 
function presentQuestion(){
    document.getElementById('qustion').innerHTML=buildQuery()


}
function rResult(){

    let query = calculate(mathQuery)
    console.log(query)
    let number = ''
    query = query.substring(0,query.length-2)
    let arrToSum = []
    for(let index=0;query.length>index;index++){
        console.log('we are here in index : '+ index +' and the number is : '+ number + ' , the query[index]='+query[index])
        if(query[index]!='-'&&query[index]!='+'){
            number=number+query[index]
        }
        else{
            //to add element to the array e.g arrToSum.push(element)
            if(query[index]=='+'){
                arrToSum.push(parseInt(number))
                number = ''
                
            }
            else{
                arrToSum.push(parseInt(number))
                number='-'   
            }
        }
    }
    arrToSum.push(parseInt(number))
    console.log(arrToSum)
    result=arrSum(arrToSum)
}
function arrSum(sumArr){
    let sum = 0
    for(let x=0; x<sumArr.length;x++){
        
         sum = sum + sumArr[x]      
    }
    return sum
}

//this function will build the query : 
//1-get random number then random operation then random number (add them to the string)
//2- in while loop flip the  coin after the third number in query
//3- get random operation then random number
//4-after quite the while change the query and the result to actual result
function buildQuery(){
    let query = getRandomNumber()+getRandomOperation()+getRandomNumber()   
    while(Math.random()<=0.45){
        query=query+getRandomOperation()+getRandomNumber()

    }
    mathQuery = query+'=?'
    return mathQuery
}
function check(){
    rResult()
    if(result==document.getElementById('check').value){
        document.getElementById('massage').innerHTML='the answer is correct'
        
    }
    else{
        document.getElementById('massage').innerHTML='the answer is wrong'
    }
}


function getRandomNumber(){ 
   let res = ''+genNumber();

    while(Math.random()<=0.45){
        res=res+genNumber()

    }
    return res
}
function genNumber(){
    let x= parseInt( Math.random()*10)
    return x 
}


function getRandomOperation(){
    let res = ''
    let operations = '+-x'
    let randomFloatIndex=Math.random()*3
    let index = parseInt(randomFloatIndex)
    return operations[index]
}
    






//this function will receive the number and the operation (as a string)
//calculate the result and return it
function calculate(query){
    let index = 0;
    let first={
        Num:'',startIndex:-1
    };
    let second={
        Num:'',startIndex:-1
    };
    let isFirst=true;
    while(query[index]!='?'){
       
        if(isNumber(query[index]) ){
            if(isFirst) {
                first.Num+=query[index];
                first.startIndex = first.startIndex===-1 ? index : first.startIndex;
            }
            else second.Num+=query[index];
        }
        else{
            if(second.Num!=''){
                let res = parseInt(first.Num)*parseInt(second.Num);
                query=query.substring(0,first.startIndex)+res+query.substring(index);
                second.Num='';
                first.Num='';
                
                isFirst=true;
                index = first.startIndex-1;
                first.startIndex=-1;
            }else{
                if(query[index]!='x') {
                    first.Num='';
                    isFirst=true;
                    first.startIndex=-1;
                }
                else{
                    isFirst=false;
                }
            }
        }
        index++;
        
    }
    return query;
}





//return true if the char is number
function isNumber(toCheck){
     return '0123456789'.includes(toCheck)
}
