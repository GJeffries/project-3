#import necessary libraries
from email.errors import ObsoleteHeaderDefect
from select import select
from flask import Flask, render_template, jsonify
import psycopg2
from configparser import ConfigParser
import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

# create instance of Flask app
app=Flask(__name__)

#def config(filename='database.ini', section='postgresql'):
    # create a parser
#    parser=ConfigParser()
#    parser.read(filename)


#path to csv file       
csvfile="C:\project3\project3_data.csv"


#define the required data frames 
obesity_data_df = pd.read_csv(csvfile)
print(obesity_data_df.head())
obesity_data_df.reset_index(inplace=True)
obesity_data_df.rename(columns={'index':'id'}, inplace=True)
obesity_data_df.drop("id", axis=1, inplace=True)
#obesity_data_df.rename(columns={'Obesity (%)':'Pct_obesity'}, inplace=True)
print(obesity_data_df.head())

rds_connection_string = "postgres:postgres@localhost:5432/project3"
engine = create_engine(f'postgresql://{rds_connection_string}')
#displaying the names of the tables created in postgresql
print(engine.table_names())
#insert data into the postgres table
obesity_data_df.to_sql(name='obesity_tbl', con=engine, if_exists='replace', index=False)
# read first 5 rows
pd.read_sql_query('select * from obesity_tbl', con=engine).head()

#query_male="select 'Country','Sex', sum('Pct_obesity') from obesity_tbl where 'Sex'='Male' group by 1,2 order by 3 desc limit 10"
#male_obesity_top10 = pd.read_sql_query(query_male, con=engine)
#df_male = pd.DataFrame(male_obesity_top10)
#df_male.to_csv(r'C:\project3\male_top10_obesity_data.csv')

#Female_obesity_top10=pd.read_sql_query ("select 'Country','Sex', sum('Pct_obesity') from obesity_tbl where 'Sex'='Female' group by 1,2 order by 3 desc",con=engine)
#df_female = pd.DataFrame(male_obesity_top10)
#df_female.to_csv(r'C:\project3\Female_top10_obesity_data.csv')

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/api/get_data")
def get_data():
       
    session = Session(bind=engine)
    execute_string = "select * from obesity_tbl where yr_id = '2016';"
    obesity_data = engine.execute(execute_string).fetchall()
    session.close()
    

    # Form dictionary to return
    obesity_data_dict = {}
    count = 0
    for row in obesity_data:
        obesity_data_dict[count] = ({
        "cntry_name": row[0],
        "latitude": row[1],
        "longitude": row[2],
        "yr_id": row[3],
        "Obs_pct": row[4],
        "sexid": row[5]

        })
        count += 1
    
    # Return dictionary as a JSON file for JS processing
    return(jsonify(obesity_data_dict))    
    #return render_template("chart.html")

@app.route("/api/get_male_data")
def get_male_data():
       
    session = Session(bind=engine)
    execute_string = "select cntry_name, sum(\"Obs_pct\") from obesity_tbl where yr_id = 2016 and sexid='Male' group by 1 order by 2 desc limit 20;"
    male_obesity_data = engine.execute(execute_string).fetchall()
    session.close()
    

    # Form dictionary to return
    obesity_male_data_dict = {}
    count = 0
    for row in male_obesity_data:
        obesity_male_data_dict[count] = ({
        "cntry_name": row[0],
        "Obs_pct_sum": row[1]
        })
        count += 1
    
    # Return dictionary as a JSON file for JS processing
    return(jsonify(obesity_male_data_dict))    
    #return render_template("chart.html")

@app.route("/barchart")
def barchart():
    """Return the chart page."""
    return render_template("barchart.html")

@app.route("/barcharts")
def barcharts():
    """Return the chart page."""
    return render_template("barcharts.html")

#@app.route("/map")
#def index():
#    """Return the chart page."""
#    return render_template("map.html")


