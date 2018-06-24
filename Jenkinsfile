pipeline {
  agent any
  stages {
    stage('checkout') {
      steps {
        checkout scm
      }
    }
    stage('clean') {
      steps {
        bat(script: 'gradlew clean --no-daemon', returnStatus: true, returnStdout: true)
      }
    }
    stage('install tools') {
      steps {
        bat(script: 'gradlew yarn_install -PnodeInstall --no-daemon', returnStatus: true, returnStdout: true)
      }
    }
    stage('backend tests') {
      steps {
        bat(script: 'gradlew test -PnodeInstall --no-daemon', returnStatus: true, returnStdout: true)
      }
    }
    stage('frontend tests') {
      steps {
        bat(script: 'gradlew yarn_test -PnodeInstall --no-daemon', returnStatus: true, returnStdout: true)
      }
    }
    stage('packaging') {
      steps {
        bat(script: 'gradlew bootWar -x test -Pprod -PnodeInstall --no-daemon', returnStatus: true, returnStdout: true)
        archiveArtifacts(artifacts: '**/build/libs/*.war', fingerprint: true)
      }
    }
  }
}