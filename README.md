# SiblingAI

# Setup 
- Have [NodeJS](https://nodejs.org/en/download) Installed
- Clone this repo

    ```git clone https://github.com/Savant-sys/siblingAI.git```

- Make sure you're on the correct folder

    ```cd siblingai```

- Install node_modules/

    ```npm install```

- Run Next.js

    ```npm run dev```

- Now it should be running on localhost:3000/

# Development Flow

There're 2 important branches: ```main``` and ```dev```, all PRs destination should be set as ```dev``` before it pushed to ```main```

1. Create your feature branch from **dev** branch

    ```git checkout dev```

    ```git checkout -b feat/your_feature dev```

2. Made your change and commit, push

    ``` git add . ```

    ``` git commit -m "commit message"```

    ``` git push ```

3. After your change is pushed, and you want to work on another feature:

    Go back to dev branch 

    ```git checkout dev```

    Pull latest change

    ```git pull```

    Repeat step 1,2