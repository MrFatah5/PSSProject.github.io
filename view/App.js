const disply=document.querySelector('#feed')//interconnection between fe html



fetch('http://localhost:3000/exportcsv')
.then(response=>response.json())
.then(data=>console.log(data))
.catch(err=>console.log(err))