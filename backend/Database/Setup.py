import sqlite3  # Import sqlite3
import  string,base64
import Encryption
conn = sqlite3.connect('UsersDB.db') # Connect to the database
cur = conn.cursor() # Create a cursor

# drop table from database
try: # Try to create the table
    conn.execute('''Drop table Users''') # Drop the Users table
    conn.commit() # Commit the changes
    print('Users table dropped.') # Print Users table dropped.
except: # If there is an error
    print('Users table did not exist') # Print Users table did not exist

# create Users table in database
cur.execute('''CREATE TABLE Users(Users_ID INTEGER PRIMARY KEY NOT NULL, Name TEXT NOT NULL, Email TEXT NOT NULL,
RoleLvl INTEGER NOT NULL, About TEXT NOT NULL, Password TEXT NOT NULL); ''')
conn.commit() # Commit the changes
print('Users table created.') # Print Users Table created.

#data to be inserted into table
#Insert David Markel into the table
nm = str(Encryption.cipher.encrypt(b'David Markel').decode("utf-8")) # Encrypt Name
ph = str(Encryption.cipher.encrypt(b'dm20gg@fsu.edu').decode("utf-8")) # Encrypt Email
pwd = str(Encryption.cipher.encrypt(b'dm20ggCEN0490').decode("utf-8")) # Encrypt Password
cur.execute("Insert Into Users ('Name','Email','RoleLvl','About','Password') "
            "Values (?, ?, ?,?,?)",(nm, ph, 1, "expertise is in full stack development will work "
                                               "primarily on the FE creating the basic pages other UI elements "
                                               "Will also work on  hooking up BE when time comes",
                                    pwd)) # Insert David Markel into the table
conn.commit() # Commit the changes

#Insert Dylan Gire into the table
nm = str(Encryption.cipher.encrypt(b'Dylan Gire').decode("utf-8")) # Encrypt Name
ph = str(Encryption.cipher.encrypt(b'dog18@fsu.edu').decode("utf-8")) # Encrypt Email
pwd = str(Encryption.cipher.encrypt(b'dog18CEN0490').decode("utf-8"))  # Encrypt Password
cur.execute("Insert Into Users ('Name','Email','RoleLvl','About','Password') "
            "Values (?, ?, ?,?,?)", (nm, ph, 1,"Don’t necessarily have an expertise, but experience in Python, "
                                               "Javascript, and HTML. I will be helping with the back end development "
                                               "and will transition to helping visualization if no more help is needed "
                                               "on the back end", pwd)) # Insert Dylan Gire into the table
conn.commit() # Commit the changes

#Insert Abraham Beltran into the table
nm = str(Encryption.cipher.encrypt(b'Abraham Beltran').decode("utf-8")) # Encrypt Name
ph = str(Encryption.cipher.encrypt(b'ab19bb@fsu.edu').decode("utf-8")) # Encrypt Email
pwd = str(Encryption.cipher.encrypt(b'ab19bbCEN0490').decode("utf-8")) # Encrypt Password
cur.execute("Insert Into Users ('Name','Email','RoleLvl','About','Password') "
            "Values (?, ?, ?,?,?)", (nm, ph, 1,"experience with full stack development, will mostly work on front end "
                                               "functionality and help with back end towards the end of the "
                                               "project.", pwd)) # Insert Abraham Beltran into the table
conn.commit() # Commit the changes

# Insert Tommy Chong into the table
nm = str(Encryption.cipher.encrypt(b'Tommy Chong').decode("utf-8")) # Encrypt Name
ph = str(Encryption.cipher.encrypt(b'tc18cj@fsu.edu').decode("utf-8")) # Encrypt Email
pwd = str(Encryption.cipher.encrypt(b'tc18cjCEN0490').decode("utf-8")) # Encrypt Password
cur.execute("Insert Into Users ('Name','Email','RoleLvl','About','Password') "
            "Values (?, ?, ?,?,?)", (nm, ph, 1,"Experience working in full stack development. "
                                               "Have experience with React, HTML, and CSS. "
                                               "I have worked with Python in the backend with Django and Flask. "
                                               "The databases I have worked with are SQLite, MongoDB and Firebase. "
                                               "Will mostly work on the frontend for the data visualization and "
                                               "storing the data to the users in the backend to the "
                                               "database.", pwd))  # Insert Tommy Chong into the table
conn.commit() # Commit the changes

#Insert Victor Marques into the table
nm = str(Encryption.cipher.encrypt(b'Victor Marques').decode("utf-8")) # Encrypt Name
ph = str(Encryption.cipher.encrypt(b'vfm20e@fsu.edu').decode("utf-8")) # Encrypt Email
pwd = str(Encryption.cipher.encrypt(b'vfm20eCEN0490').decode("utf-8")) # Encrypt Password
cur.execute("Insert Into Users ('Name','Email','RoleLvl','About','Password') "
            "Values (?, ?, ?,?,?)", (nm, ph, 1,"Experience in full stack, C++, HTML, and Webstorm. "
                                               "I will work with helping design algorithms needed to manipulate "
                                               "the stored data and functions needed on either front or "
                                               "back end cases.", pwd)) # Insert Victor Marques into the table
conn.commit() # Commit the changes

for row in cur.execute('SELECT * FROM Users;'): # For each row in the table
    print(row) # Print the row

conn.close() # Close the connection
print('Connection closed.') # Print Connection closed.
