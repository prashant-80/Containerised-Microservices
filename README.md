# Containerised Microservices

A simple, containerised microservices setup for a flight booking domain:
- API Gateway
- Flights Service
- Booking Service

All services run locally via Docker Compose and communicate on a shared bridge network.

## Stack
- Docker + Docker Compose
- Node.js services (source bind-mounted; `node_modules` stored in named volumes)

## Services and Ports
| Service          | Compose name      | Port (host:container) |
|------------------|-------------------|------------------------|
| API Gateway      | `api_gateway`     | 8000:8000             |
| Flights Service  | `flights_service` | 3000:3000             |
| Booking Service  | `booking_service` | 4000:4000             |

Network: `microservice-network`  
Named volumes:
- `api-gateway-node-modules`
- `flights-service-node-modules`
- `booking-service-node-modules`

## Quick Start
1. Clone the repo:
   - `git clone https://github.com/prashant-80/Containerised-Microservices.git`
   - `cd Containerised-Microservices`
2. Build and start all services:
   - `docker compose up --build -d`
3. Access locally:
   - API Gateway: http://localhost:8000
   - Flights Service: http://localhost:3000
   - Booking Service: http://localhost:4000

Code is bind-mounted into containers for iterative development. Dependencies are installed inside containers and persisted in named volumes.

## Stop and Clean
- Stop containers: `docker compose down`
- Stop and remove volumes: `docker compose down -v`
- Stop, remove volumes and images: `docker compose down -v --rmi all`

## Project Structure (high-level)
- `API-Gateway/` – API gateway service
- `Flight_search/` – Flights service
- `Booking_Service/` – Booking service
- `docker-compose.yml` – Multi-service orchestration

Note: If your filesystem is case-sensitive, ensure folder names match the `docker-compose.yml` contexts (e.g., `./api-gateway`, `./Flight_search`, `./Booking_service`). If they differ, either rename folders or update the compose file accordingly.

## Using this as a Template (optional)
- Remove existing Git history: `rm -rf .git` (then re-init as needed)

## Troubleshooting
- Port already in use: change host ports in `docker-compose.yml` or free the ports.
- Build context errors: verify service paths in `docker-compose.yml` match directory names.
- Dependency issues: rebuild with `docker compose up --build -d` to reinstall inside containers.
