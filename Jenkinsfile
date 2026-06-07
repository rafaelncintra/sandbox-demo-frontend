pipeline {
  agent any
  parameters {
    string(name: 'COMMIT', defaultValue: '', description: 'Git commit SHA to build')
  }
  environment {
    REGISTRY   = 'ghcr.io/your-org'
    IMAGE_NAME = 'product-frontend'
    FULL_IMAGE = "${REGISTRY}/${IMAGE_NAME}"
  }
  stages {
    stage('Checkout') {
      steps {
        script {
          if (params.COMMIT) {
            checkout([$class: 'GitSCM',
              branches: [[name: params.COMMIT]],
              userRemoteConfigs: [[url: env.GIT_URL]]
            ])
          } else {
            checkout scm
          }
        }
      }
    }
    stage('Build Image') {
      steps {
        script {
          def shortSha = params.COMMIT ? params.COMMIT.take(7) : sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
          def tag = "${FULL_IMAGE}:${shortSha}"
          sh "docker build -t ${tag} ."
          sh "docker push ${tag}"
          if (env.BRANCH_NAME == 'main') {
            sh "docker tag ${tag} ${FULL_IMAGE}:latest"
            sh "docker push ${FULL_IMAGE}:latest"
          }
          currentBuild.description = shortSha
        }
      }
    }
  }
}
