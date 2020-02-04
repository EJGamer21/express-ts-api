mysqld --default-authentication-plugin=mysql_native_password

# Login
mysql -u $MYSQL_USER -p $MYSQL_PASS

# Alter user
ALTER USER $MYSQL_USER@$MYSQL_HOST IDENTIFIED WITH mysql_native_password BY $MYSQL_PASS;
FLUSH PRIVILEGES;

# Exit
exit;