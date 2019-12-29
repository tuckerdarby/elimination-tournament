import { IParticle } from './types';
import { Trigger } from '../../jassOverrides/Trigger';
import { moveParticle } from './moveParticle';

class ParticleEngine {
  private particles: IParticle<any>[] = [];
  private timedTrigger: Trigger | undefined;
  private gravity: number = -0.5;

  private step(): void {
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

  public startEngine(): boolean {
    if (!this.timedTrigger) {
      this.timedTrigger = new Trigger();
      this.timedTrigger.RegisterTimerEventPeriodic(0.01);
      this.timedTrigger.AddAction(() => this.step());
      return true;
    }
    return false;
  }

  public stopEngine(): boolean {
    if (this.timedTrigger) {
      this.timedTrigger.Destroy();
      this.timedTrigger = undefined;
      return true;
    }
    return false;
  }

  public addParticle(particle: IParticle<any>): void {
    this.particles.push(particle);
  }

  public removeParticle(particle: IParticle<any>): void {
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
