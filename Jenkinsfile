#!/usr/bin/env groovy

pipeline {
    agent any
    stages {
        stage('checkout') {
            steps {
                checkout scm
            }
        }

        stage('check java') {
            steps {
                sh "java -version"
            }
        }   

        stage('clean') {
            steps {
                sh "chmod +x gradlew"
                sh "./gradlew clean --no-daemon"
            }
        }

        stage('install tools') {
            steps {
                sh "./gradlew yarn_install -PnodeInstall --no-daemon"
            }
        }

        stage('backend tests') {
            steps {
                try {
                    sh "./gradlew test -PnodeInstall --no-daemon"
                } catch(err) {
                    throw err
                } finally {
                    junit '**/build/**/TEST-*.xml'
                }
            }
        }

        stage('frontend tests') {
            steps {
                try {
                    sh "./gradlew yarn_test -PnodeInstall --no-daemon"
                } catch(err) {
                    throw err
                } finally {
                    junit '**/build/test-results/jest/TESTS-*.xml'
                }
            }
        }

        stage('packaging') {
            steps {
                sh "./gradlew bootWar -x test -Pprod -PnodeInstall --no-daemon"
                archiveArtifacts artifacts: '**/build/libs/*.war', fingerprint: true
            }
        }
    }
}
