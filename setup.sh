if ! type "ruby" > /dev/null;
	then 
		sudo apt-get install ruby-full
else
	echo "ruby exists"
fi

if ! type "brew" > /dev/null;
	then
		ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" 
else
	echo "brew downloaded"
fi

if ! type "mongo" > /dev/null
	then 
		brew install mongodb
		echo "mongodb downloaded"
else
	echo "mongo downloaded"
fi

if [ ! -d data ]
	then
    	mkdir data
		echo "db directory created"
fi

if ! type "node" > /dev/null
	then
		brew install node
		echo "node downloaded"
fi

sudo npm install 
echo 'node modules downloaded'
