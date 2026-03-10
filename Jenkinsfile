pipeline {
  agent any

  stages {

    stage('Checkout Code') {
      steps {
        git branch: 'main',
        url: 'https://github.com/itnisamarin-blip/playwright-automation'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Install Playwright Browsers') {
      steps {
        sh 'npx playwright install'
      }
    }

    stage('Run Automation Test') {
      steps {
        sh 'npx playwright test'
      }
    }

  }
}