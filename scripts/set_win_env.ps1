# Need to launch Powershell with these options
# powershell.exe -exec bypass 

# Initialize Variables - Change JSONFILE and ENVFILE
$scriptpath = $MyInvocation.MyCommand.Path
$dir = Split-Path $scriptpath
$HostIP = (Get-NetIPConfiguration | Where-Object { $_.IPv4DefaultGateway -ne $null -and $_.NetAdapter.Status -ne "Disconnected" }).IPv4Address.IPAddress
$root = $dir -replace "script"
Write-Output $root
$JSONFILE = $root + "secrets\secrets.json"
$ENVFILE =  ".env"

# Parse JSONFILE
$json = Get-Content -Raw -Path $JSONFILE 
$parsed = $json | ConvertFrom-Json

foreach ($line in $parsed | Get-Member) {
    $dbname = $parsed.$($line.Name).DB_NAME
    $dbuser = $parsed.$($line.Name).DB_USERNAME
    $dbpw = $parsed.$($line.Name).DB_PASSWORD
#    $dbport = $parsed.$($line.Name).DB_PORT
    $dbhost = $parsed.$($line.Name).DB_HOST
}
if (![System.IO.File]::Exists($ENVFILE)) {
    echo "DB_NAME=$dbname" > $ENVFILE
    echo "DB_USER=$dbuser" >> $ENVFILE
    echo "DB_PASS=$dbpw" >> $ENVFILE
    echo "DB_PORT=5432" >> $ENVFILE
    #echo "DB_NAME=$dbport" >> $ENVFILE
    echo "DB_PORT=5432" >> $ENVFILE
    echo "SECRET_HASH=RSA-SHA256" >> $ENVFILE
    echo "SECRET_IP=http`://$HostIP`:8080/" >> $ENVFILE
} else {
    echo "DB_NAME=$dbname" > $ENVFILE
    echo "DB_USER=$dbuser" >> $ENVFILE
    echo "DB_PASS=$dbpw" >> $ENVFILE
    echo "DB_PORT=5432" >> $ENVFILE
    #echo "DB_NAME=$dbport" >> $ENVFILE
    echo "DB_HOST=$dbname" >> $ENVFILE
    echo "SECRET_HASH=RSA-SHA256" >> $ENVFILE
    echo "SECRET_IP=http`://$HostIP`:8080/" >> $ENVFILE
}