

const initialtestData = {
    data1:[1,2,3,4,5,6],
    total:0,
    data2:'data2',
    data3:'data3'
}

const testReducer = function(testData=initialtestData,action){


    switch(action.type){

        case 'LOAD': 
            return {
                ...testData,
                total: (function(){
                    return testData.data1.reduce((total,current)=>{
                       return total+=current
                    },0)
                })()
            }

        case 'SET_DATA1':
           // console.log(testData.data1)
            return{
                ...testData,
                data1:action.value
            }

         case 'SET_DATA1':
               // console.log(testData.data1)
                return{
                    ...testData,
                    data1:action.value
            }

        case 'SET_DATA2':
              //  console.log(testData.data2)
                return{
                    ...testData,
                    data2:action.value
                }

         case 'SET_DATA3':
               //  console.log(testData.data3)
                return{
                    ...testData,
                    data3:action.value
                }
        
        default:
       // console.log(testData.total)    
        return testData
    }

}

export default testReducer