class GamesController < ApplicationController

  before_action :get_game, only: [:show, :edit, :update, :destroy]

  IGDB = IGDB::Client.new(
    ENV['IGDB_CLIENT_ID'],
    ENV['IGDB_CLIENT_SECRET']
  )

  def index(search = params[:search] || "")
    @games = IGDB.search(search, {fields: "name,summary", limit: 10})
  end

  def show
  end

  def new
    @game = Game.new
  end

  def create
    @game = Game.new(game_params)
    if @game.save
      redirect_to @game
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @game.update(game_params)
      redirect_to @game
    else
      render :edit
    end
  end

  def destroy
    @game.destroy
    redirect_to games_path
  end

  private

  def game_params
    params.require(:game).permit(:name, :cover_url, :summary, :status, :wishlisted)
  end 

  def get_game
    @game = Game.find(params[:id])
  end 

end
