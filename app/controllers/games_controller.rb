class GamesController < ApplicationController

  before_action :get_game, only: [:show, :edit, :update, :destroy]


  def index
    @games = Game.all
  end

  def show
    render json: @game
  end

  def search

  end

  def new
  end

  def create
    @game = Game.new(game_params)
    if @game.save
      render json: @game
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
    params.require(:game).permit(:name, :cover_url, :rawg_id)
  end 

  def get_game
    @game = Game.find(params[:id])
  end 

end
