class GamesController < ApplicationController

  before_action :get_game, only: [:show, :update, :destroy]

  def index
    @games = Game.all
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @games }
    end
  end

  def library
  end

  def json_index(rawg_id = params[:rawg_id])
    @game = Game.where(rawg_id: rawg_id)
    render json: @game
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
      render json: @game
    else
      render :edit
    end
  end

  def destroy
    @game.destroy
  end

  private

  def game_params
    params.require(:game).permit(:name, :cover_url, :rawg_id, :slug, :year, :status)
  end 

  def get_game
    @game = Game.find(params[:id])
  end 

end
