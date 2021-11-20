const moment = require('moment')
const { pool } = require('../config/db')

const getStats = async (request, response) => {
  const {param} = request.params;
  //console.log(param);

    try {
        if(param) {
           
        //const d = new Date();
        const datebynode = moment().format("YYYY-MM-DD") // 
        if(param == 'daily'){         
                dur = 'hour' 
                const { rows } = await  pool.query(" select  date_trunc($1, date) dt,   sum(amount)   from sales  where CURRENT_DATE = '"+datebynode+"'  group by dt order by dt  " , [dur])
                const dbResponse = rows;
                successMessage = dbResponse
                response.status(200).json({ status: 'success', message: 'daily records', data: successMessage })      
            }
            else if(param == 'weekly'){
                dur = 'day' 
                const { rows } = await  pool.query(" select date_trunc($1, date) dt,   sum(amount)   from sales where  EXTRACT(WEEK FROM date_trunc($1, date) ) = EXTRACT(WEEK FROM  CURRENT_DATE)   group by dt order by dt  " , [dur])
                const dbResponse = rows;
                successMessage = dbResponse
                response.status(200).json({ status: 'success', message: 'Weekly records', data: successMessage })
            }   
            else if(param == 'monthly'){  
                dur = 'day' 
                const { rows } = await  pool.query("select date_trunc($1, date) dt,   sum(amount)   from sales   where  EXTRACT(MONTH FROM  date) = EXTRACT(MONTH FROM  CURRENT_DATE)   group by dt order by dt  " , [dur])
                const dbResponse = rows;
                successMessage = dbResponse
                response.status(200).json({ status: 'success', message: 'Monthly records', data: successMessage })
            }
            else{ 
            response.status(415).json("Invalid Input")
            }
        }
        else{
            const { rows } = await  pool.query('SELECT * FROM "public"."sales" LIMIT 100 ' )
            const dbResponse = rows;
            successMessage = dbResponse
            response.status(200).json({ status: 'success', message: 'All records', data: successMessage })
            }

       } catch (error) {
        errorMessage = 'Unable to Show Stats';
        response.status(415).json(errorMessage)
    }
      
}
        


const createSales = async (request, response) => {
    
    try {
        const { username, amount   } = request.body
        const time = new Date()
    
        if(typeof username == 'undefined' && !amount ) {
        errorMessage = 'Username, amount field cannot be empty';
        let status = 403; 
        response.status(201).json({ status: 'error', message: errorMessage })
        }
    
        const { rows } = await  pool.query('INSERT INTO sales (userName,amount,date) VALUES ($1, $2, $3)',[username, amount, time ])
        const dbResponse = rows[0];
        successMessage = dbResponse
        response.status(200).json({ status: 'success', message: 'record added!', data: successMessage })

    } catch (error) {
        errorMessage = 'Unable to create';
        response.status(415).json(errorMessage)
    }

}


module.exports = {
    createSales,
    getStats
};
