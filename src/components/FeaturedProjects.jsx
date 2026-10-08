import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects.js';

function FeaturedProjects() {
  return (
    <section className="featured-projects" id="our-work" aria-labelledby="projects-title">
      <div className="container">
        <header className="featured-projects__header">
          <div className="featured-projects__heading">
            <p className="featured-projects__eyebrow">Selected work</p>
            <h2 className="featured-projects__title" id="projects-title">
              Made for real spaces.
            </h2>
            <p className="featured-projects__intro">
              A selection of furniture and woodwork shaped around the people, spaces and ideas
              they were created for.
            </p>
          </div>
          <a className="featured-projects__view-all" href="/our-work">
            View All Projects <ArrowRight size={18} strokeWidth={1.7} aria-hidden="true" />
          </a>
        </header>

        <div className="featured-projects__grid">
          {projects.map((project, index) => {
            const imageSource = project.heroImage;
            const projectTitle = project.title;

            return (
              <a
                className={`featured-projects__item featured-projects__item--${index + 1}`}
                href={project.href}
                key={project.number}
                aria-label={`View ${projectTitle} project`}
              >
                <span className="featured-projects__media">
                  <span className="featured-projects__image-fallback" aria-hidden="true" />
                  {imageSource && (
                    <img
                      className="featured-projects__image"
                      src={imageSource}
                      alt={project.imageAlt}
                      loading="lazy"
                      decoding="async"
                      onError={(event) => {
                        event.currentTarget.hidden = true;
                      }}
                    />
                  )}
                </span>
                <span className="featured-projects__overlay" aria-hidden="true" />

                <span className="featured-projects__content">
                  <span className="featured-projects__meta">
                    <span>{project.number}</span>
                    <span>{project.category}</span>
                  </span>
                  <span className="featured-projects__project-title">
                    {project.titleLines.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </span>
                  <span className="featured-projects__location">{project.location}</span>
                </span>

                <span className="featured-projects__arrow" aria-hidden="true">
                  <ArrowUpRight size={21} strokeWidth={1.7} />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProjects;
