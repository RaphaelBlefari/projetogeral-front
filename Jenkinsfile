node {

    def nodeHome = tool name: 'nodejs', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
    env.PATH = "${nodeHome}:${nodeHome}/bin:${env.PATH}"

    checkout scm

    // Pega o commit id para ser usado de tag (versionamento) na imagem
    sh "git rev-parse --short HEAD > commit-id"
    tag = readFile('commit-id').replace("\n", "").replace("\r", "")
    
    // configura o nome da aplicação, o endereço do repositório e o nome da imagem com a versão
    appName = "projetogeral-front"
    registryHost = "registry/"
    imageName = "${registryHost}${appName}:${tag}"
    
    // Configuramos os estágios
    

    stage('check tools') {
        echo env.PATH
        sh "node -v"
        sh "npm -v"
        sh "npm i -g @angular/cli@7.0.4" 
        sh "npm install --unsafe-perm node-sass"       
        sh "ng -v"
    }

    stage "npm install"

        sh 'npm install'
    
    stage "Buidando Aplicação"
    
        sh 'ng build'

     stage "Buildando Imagem"

        def customImage = docker.build("${imageName}")

    stage "Push para registry"

        customImage.push()

    stage "Deploy PROD"

        input "Deploy to PROD?"
        customImage.push('latest')
        sh "kubectl apply -f https://raw.githubusercontent.com/RaphaelBlefari/${appName}/master/${appName}.yaml"
        sh "kubectl set image deployment app app=${imageName} --record"
        sh "kubectl rollout status deployment/${appName}"
}