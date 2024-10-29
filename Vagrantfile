# vagrant up --provider=docker
# using docker, no VM
Vagrant.configure("2") do |config|
  config.vm.define "postgresql" do |pg|
    pg.vm.provider "docker" do |d|
      d.image = "postgres:latest"
      d.name = "postgresql"
      d.ports = ["5432:5432"]
      d.env = {
        "POSTGRES_USER" => "admin",
        "POSTGRES_PASSWORD" => "password",
        "POSTGRES_DB" => "exercise_db"
      }
    end
  end

  config.vm.define "redis" do |r|
    r.vm.provider "docker" do |d|
      d.image = "redis:latest"
      d.name = "redis"
      d.ports = ["6379:6379"]
    end
  end
end
