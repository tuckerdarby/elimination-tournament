import { IParticle } from './types';
import { Trigger } from '../../jassOverrides/Trigger';
import { moveParticle } from './moveParticle';
import { Log } from '../../lib/Serilog/Serilog';

class ParticleEngine {
  private particles: IParticle[] = [];
  private timedTrigger: Trigger | undefined;
  private enabled: boolean = false;
  private gravity: number = 2500;

  private step() {
    this.particles.forEach(particle => {
      if (UnitAlive(particle.unit)) {
        moveParticle(particle, this.gravity);
        if (particle.position.z <= GetLocationZ(GetUnitLoc(particle.unit))) {
          particle.groundEffect(particle);
        }
      } else {
        particleEngine.removeParticle(particle);
      }
    });
  }

  public startEngine() {
    if (!this.timedTrigger) {
      this.timedTrigger = new Trigger();
      this.timedTrigger.RegisterTimerEventPeriodic(0.01);
      this.timedTrigger.AddAction(() => this.step());
    }
  }

  public stopEngine() {
    if (this.timedTrigger) {
      this.timedTrigger.Destroy();
      this.timedTrigger = undefined;
    }
  }

  public addParticle(particle: IParticle) {
    this.particles.push(particle);
  }

  public removeParticle(particle: IParticle) {
    const particleIndex = this.particles.indexOf(particle);
    if (particleIndex > -1) {
      this.particles.splice(particleIndex, 1);
    }
  }

  public getGravity(): number {
    return this.gravity;
  }

  public setGravity(gravity: number): void {
    this.gravity = gravity;
  }
}

export const particleEngine = new ParticleEngine();
