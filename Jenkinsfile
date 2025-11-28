pipeline {
    agent any
    
    environment {
        // Configuration
        IMAGE_NAME = "soiby"
        IMAGE_TAG = "${BUILD_NUMBER}-${new Date().format('MMdd-HHmm')}"
        DOCKER_PORT = "8070"  // Port disponible
        CONTAINER_NAME = "soiby"
        REGISTRY = "localhost:5151"
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo '📦 Récupération du code source...'
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    echo '🔨 Construction de l\'image Docker...'
                    sh """
                        docker build -t ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} .
                        docker tag ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} ${REGISTRY}/${IMAGE_NAME}:latest
                    """
                }
            }
        }
        
        stage('Push to Registry') {
            steps {
                script {
                    echo '📤 Push vers le registry local...'
                    sh """
                        docker push ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}
                        docker push ${REGISTRY}/${IMAGE_NAME}:latest
                    """
                }
            }
        }
        
        stage('Stop Old Container') {
            steps {
                script {
                    echo '🛑 Arrêt de l\'ancien container...'
                    sh """
                        docker stop ${CONTAINER_NAME} || true
                        docker rm ${CONTAINER_NAME} || true
                    """
                }
            }
        }
        
        stage('Run Container') {
            steps {
                script {
                    echo '🚀 Démarrage du nouveau container...'
                    sh """
                        docker run -d \
                            --name ${CONTAINER_NAME} \
                            --restart unless-stopped \
                            -p ${DOCKER_PORT}:3000 \
                            ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}
                    """
                }
            }
        }
        
        stage('Health Check') {
            steps {
                script {
                    echo '🏥 Vérification de santé...'
                    sleep 15
                    sh """
                        docker ps | grep ${CONTAINER_NAME}
                        echo '📋 Logs du container:'
                        docker logs --tail 50 ${CONTAINER_NAME}
                    """
                }
            }
        }
        
        stage('Cleanup Old Images') {
            steps {
                script {
                    echo '🧹 Nettoyage des anciennes images (garde les 5 dernières)...'
                    sh """
                        docker images ${REGISTRY}/${IMAGE_NAME} --format '{{.Tag}}' | \
                        grep -v latest | \
                        grep -v ${IMAGE_TAG} | \
                        sort -r | \
                        tail -n +6 | \
                        xargs -r -I {} docker rmi ${REGISTRY}/${IMAGE_NAME}:{} || true
                    """
                }
            }
        }
    }
    
    post {
        success {
            echo '✅ ========================================='
            echo '✅ DÉPLOIEMENT RÉUSSI!'
            echo '✅ ========================================='
            echo "🌐 Application accessible sur: http://your-server:${DOCKER_PORT}"
            echo "📦 Image: ${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}"
            echo "🐳 Container: ${CONTAINER_NAME}"
        }
        failure {
            echo '❌ ========================================='
            echo '❌ LE DÉPLOIEMENT A ÉCHOUÉ!'
            echo '❌ ========================================='
            sh """
                echo '📋 Logs du container (si disponible):'
                docker logs ${CONTAINER_NAME} || true
                echo '🔍 État des containers:'
                docker ps -a | grep ${CONTAINER_NAME} || true
            """
        }
        always {
            echo '🧹 Nettoyage des ressources Docker inutilisées...'
            sh """
                docker system prune -f || true
            """
        }
    }
}