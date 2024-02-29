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
  end
  status 200
  body "Webhook traité avec succès sur, #{ENVIR}"
end