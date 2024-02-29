require 'sinatra'
require 'json'

# Spécifier le port
set :port, 8089

ENVIR = ENV["ENVIRONMENT"]

# Définition d'une route
post '/' do
  @payload = JSON.parse(params[:payload])
  if @payload["ref"] == "refs/heads/#{ENVIR}"
    #pull code : 
    # system('/usr/aafm-front/.cicd/pull.sh')
    # build app
    # system('/usr/aafm-front/.cicd/build.sh')

    # Répondre avec un code de statut approprié ou un message de succès si nécessaire
    status 200
    body "Webhook traité avec succès sur, #{ENVIR}"
  end
end