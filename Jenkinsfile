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
        sh 'chmod +x gradlew'
        sh './gradlew clean --no-daemon'
      }
    }
    stage('install tools') {
      steps {
        sh './gradlew yarn_install -PnodeInstall --no-daemon'
      }
    }
    stage('backend tests') {
      steps {
        sh './gradlew test -PnodeInstall --no-daemon'
      }
    }
    stage('frontend tests') {
      steps {
        sh './gradlew yarn_test -PnodeInstall --no-daemon'
      }
    }
    stage('packaging') {
      steps {
        sh './gradlew bootWar -x test -Pprod -PnodeInstall --no-daemon'
        archiveArtifacts(artifacts: '**/build/libs/*.war', fingerprint: true)
      }
    }
  }
}