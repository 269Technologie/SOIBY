pipeline {
    agent any

    environment {
        PROJECT_NAME      = 'soiby'
        REGISTRY          = '195.20.248.18:30151'
        IMAGE_NAME        = "${REGISTRY}/${PROJECT_NAME}"
        NAMESPACE         = 'soiby'
        CONTAINER_PORT    = '3012'
        NODEPORT          = '30071'
        GIT_COMMIT_SHORT  = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
        BUILD_TAG         = "${BUILD_NUMBER}-${GIT_COMMIT_SHORT}"
    }

    stages {

        stage('Checkout') {
            steps {
                echo "📥 Récupération du code source..."
                checkout scm
            }
        }

        stage('Build Image') {
            steps {
                echo "🐳 Construction de l'image Docker..."
                sh """
                    docker build --no-cache -t ${IMAGE_NAME}:${BUILD_TAG} .
                    docker tag ${IMAGE_NAME}:${BUILD_TAG} ${IMAGE_NAME}:latest
                """
            }
        }

        stage('Push to Registry') {
            steps {
                echo "⬆️ Push vers le registry (${REGISTRY})..."
                sh """
                    docker push ${IMAGE_NAME}:${BUILD_TAG}
                    docker push ${IMAGE_NAME}:latest
                """
            }
        }

        stage('Create Namespace') {
            steps {
                echo "📁 Création du namespace si inexistant..."
                sh "kubectl get namespace ${NAMESPACE} || kubectl create namespace ${NAMESPACE}"
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo "🚀 Déploiement sur Kubernetes (namespace: ${NAMESPACE})..."
                sh """
                    cat <<EOF | kubectl apply -f -
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${PROJECT_NAME}
  namespace: ${NAMESPACE}
  labels:
    app: ${PROJECT_NAME}
spec:
  replicas: 1
  selector:
    matchLabels:
      app: ${PROJECT_NAME}
  template:
    metadata:
      labels:
        app: ${PROJECT_NAME}
        version: "${BUILD_TAG}"
    spec:
      containers:
      - name: ${PROJECT_NAME}
        image: ${IMAGE_NAME}:${BUILD_TAG}
        imagePullPolicy: Always
        ports:
        - containerPort: ${CONTAINER_PORT}
        env:
        - name: NODE_ENV
          value: "production"
        - name: PORT
          value: "${CONTAINER_PORT}"
        - name: HOSTNAME
          value: "0.0.0.0"
        - name: NEXT_TELEMETRY_DISABLED
          value: "1"
        resources:
          requests:
            memory: "256Mi"
            cpu: "200m"
          limits:
            memory: "512Mi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: ${PROJECT_NAME}
  namespace: ${NAMESPACE}
spec:
  selector:
    app: ${PROJECT_NAME}
  ports:
  - port: ${CONTAINER_PORT}
    targetPort: ${CONTAINER_PORT}
    nodePort: ${NODEPORT}
    protocol: TCP
  type: NodePort
EOF
                """
            }
        }

        stage('Wait & Health Check') {
            steps {
                echo "⌛ Attente du rollout..."
                sh """
                    kubectl rollout status deployment/${PROJECT_NAME} -n ${NAMESPACE} --timeout=120s
                    echo "✅ Pods en cours :"
                    kubectl get pods -n ${NAMESPACE} -l app=${PROJECT_NAME}
                    kubectl get svc -n ${NAMESPACE}
                """
            }
        }

        stage('Cleanup Old Images') {
            steps {
                echo "🧹 Nettoyage des images Docker inutilisées..."
                sh "docker image prune -f"
            }
        }
    }

    post {
        success {
            echo "🎉 Déploiement réussi : ${PROJECT_NAME}:${BUILD_TAG}"
            echo "→ Accessible sur : https://soiby.fr"
            echo "→ NodePort : http://195.20.248.18:${NODEPORT}"
            echo "→ Tag utilisé : ${BUILD_TAG}"
        }
        failure {
            echo "❌ Échec du pipeline – vérifiez les logs"
            sh "kubectl describe deployment/${PROJECT_NAME} -n ${NAMESPACE} || true"
            sh "kubectl get events -n ${NAMESPACE} --sort-by='.lastTimestamp' || true"
        }
        always {
            echo "Pipeline terminé à ${currentBuild.durationString}"
            cleanWs()
        }
    }
}
