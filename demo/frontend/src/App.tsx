import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import {
  createProject,
  getProfile,
  getProjects,
  login,
  submitContact,
  updateProfile,
} from './api';
import type { Profile, ProjectItem } from './types';
import './App.css';

const TOKEN_KEY = 'portfolio-token';

function emptyProject(): Omit<ProjectItem, 'id'> {
  return {
    title: '',
    description: '',
    techStack: '',
    projectUrl: '',
    repositoryUrl: '',
  };
}

function App() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [contactStatus, setContactStatus] = useState<string>('');
  const [authStatus, setAuthStatus] = useState<string>('');
  const [token, setToken] = useState<string>(() => localStorage.getItem(TOKEN_KEY) ?? '');

  const [profileDraft, setProfileDraft] = useState<Omit<Profile, 'id'> | null>(null);
  const [projectDraft, setProjectDraft] = useState<Omit<ProjectItem, 'id'>>(emptyProject());

  const isAuthenticated = useMemo(() => Boolean(token), [token]);
  const isContactError = /failed|error/i.test(contactStatus);
  const isAuthError = /failed|error/i.test(authStatus);
  const contactStatusTone = /failed|error/i.test(contactStatus) ? 'status error' : 'status';
  const authStatusTone = /failed|error/i.test(authStatus) ? 'status error' : 'status';

  async function loadPortfolio() {
    setLoading(true);
    setError(null);

    try {
      const [profileData, projectData] = await Promise.all([getProfile(), getProjects()]);
      setProfile(profileData);
      setProjects(projectData);
      setProfileDraft({
        fullName: profileData.fullName,
        headline: profileData.headline,
        about: profileData.about,
        email: profileData.email,
        linkedInUrl: profileData.linkedInUrl,
        gitHubUrl: profileData.gitHubUrl,
      });
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Failed to load data.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPortfolio();
  }, []);

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const response = await submitContact({
        name: String(formData.get('name') ?? ''),
        email: String(formData.get('email') ?? ''),
        message: String(formData.get('message') ?? ''),
      });
      setContactStatus(response.message);
      event.currentTarget.reset();
    } catch (submitError) {
      setContactStatus(submitError instanceof Error ? submitError.message : 'Submit failed.');
    }
  }

  async function handleLoginSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const response = await login({
        email: String(formData.get('email') ?? ''),
        password: String(formData.get('password') ?? ''),
      });
      localStorage.setItem(TOKEN_KEY, response.token);
      setToken(response.token);
      setAuthStatus(`Logged in as ${response.email}`);
    } catch (loginError) {
      setAuthStatus(loginError instanceof Error ? loginError.message : 'Login failed.');
    }
  }

  function handleLogout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken('');
    setAuthStatus('Logged out.');
  }

  async function handleProfileSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!profileDraft || !token) {
      return;
    }

    try {
      const updatedProfile = await updateProfile(token, profileDraft);
      setProfile(updatedProfile);
      setAuthStatus('Profile updated.');
    } catch (saveError) {
      setAuthStatus(saveError instanceof Error ? saveError.message : 'Update failed.');
    }
  }

  async function handleProjectCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) {
      return;
    }

    try {
      const createdProject = await createProject(token, projectDraft);
      setProjects((current) => [...current, createdProject]);
      setProjectDraft(emptyProject());
      setAuthStatus('Project created.');
    } catch (createError) {
      setAuthStatus(createError instanceof Error ? createError.message : 'Create failed.');
    }
  }

  if (loading) {
    return <main className="container">Loading portfolio...</main>;
  }

  if (error || !profile) {
    return <main className="container">Error: {error ?? 'Profile unavailable.'}</main>;
  }

  return (
    <main className="container">
      <header className="hero section">
        <p className="eyebrow">Portfolio</p>
        <h1>{profile.fullName}</h1>
        <p className="hero-copy">{profile.headline}</p>
        <div className="hero-meta">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.linkedInUrl} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={profile.gitHubUrl} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </header>

      <section className="section">
        <h2>About</h2>
        <p>{profile.about}</p>
      </section>

      <section className="section">
        <h2>Projects</h2>
        <div className="grid">
          {projects.map((project, index) => (
            <article key={project.id} className="card">
              <p className="eyebrow">Case Study {String(index + 1).padStart(2, '0')}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p>
                <strong>Stack:</strong> {project.techStack}
              </p>
              <div className="links">
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.title} live demo`}
                >
                  Live
                </a>
                <a
                  href={project.repositoryUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.title} source code`}
                >
                  Code
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Contact</h2>
        <form onSubmit={handleContactSubmit} className="form">
          <label className="sr-only" htmlFor="contact-name">
            Name
          </label>
          <input id="contact-name" name="name" required placeholder="Your name" />
          <label className="sr-only" htmlFor="contact-email">
            Email
          </label>
          <input id="contact-email" name="email" type="email" required placeholder="Your email" />
          <label className="sr-only" htmlFor="contact-message">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            minLength={5}
            placeholder="Your message"
          />
          <button type="submit">Send message</button>
        </form>
        {contactStatus && (
          <p className={contactStatusTone} role={isContactError ? 'alert' : 'status'} aria-live="polite">
            {contactStatus}
          </p>
        )}
      </section>

      <section className="section admin">
        <h2>Admin</h2>
        {!isAuthenticated ? (
          <form onSubmit={handleLoginSubmit} className="form">
            <label className="sr-only" htmlFor="admin-email">
              Admin email
            </label>
            <input
              id="admin-email"
              name="email"
              type="email"
              required
              placeholder="admin@portfolio.local"
            />
            <label className="sr-only" htmlFor="admin-password">
              Password
            </label>
            <input id="admin-password" name="password" type="password" required placeholder="Password" />
            <button type="submit">Login</button>
          </form>
        ) : (
          <>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>

            {profileDraft && (
              <form onSubmit={handleProfileSave} className="form">
                <label className="sr-only" htmlFor="profile-full-name">
                  Full name
                </label>
                <input
                  id="profile-full-name"
                  value={profileDraft.fullName}
                  onChange={(event) =>
                    setProfileDraft({ ...profileDraft, fullName: event.target.value })
                  }
                  required
                  placeholder="Full name"
                />
                <label className="sr-only" htmlFor="profile-headline">
                  Headline
                </label>
                <input
                  id="profile-headline"
                  value={profileDraft.headline}
                  onChange={(event) =>
                    setProfileDraft({ ...profileDraft, headline: event.target.value })
                  }
                  required
                  placeholder="Headline"
                />
                <label className="sr-only" htmlFor="profile-about">
                  About
                </label>
                <textarea
                  id="profile-about"
                  value={profileDraft.about}
                  onChange={(event) =>
                    setProfileDraft({ ...profileDraft, about: event.target.value })
                  }
                  required
                  placeholder="About"
                />
                <label className="sr-only" htmlFor="profile-email">
                  Contact email
                </label>
                <input
                  id="profile-email"
                  value={profileDraft.email}
                  onChange={(event) =>
                    setProfileDraft({ ...profileDraft, email: event.target.value })
                  }
                  type="email"
                  required
                  placeholder="Contact email"
                />
                <label className="sr-only" htmlFor="profile-linkedin">
                  LinkedIn URL
                </label>
                <input
                  id="profile-linkedin"
                  value={profileDraft.linkedInUrl}
                  onChange={(event) =>
                    setProfileDraft({ ...profileDraft, linkedInUrl: event.target.value })
                  }
                  placeholder="LinkedIn URL"
                />
                <label className="sr-only" htmlFor="profile-github">
                  GitHub URL
                </label>
                <input
                  id="profile-github"
                  value={profileDraft.gitHubUrl}
                  onChange={(event) =>
                    setProfileDraft({ ...profileDraft, gitHubUrl: event.target.value })
                  }
                  placeholder="GitHub URL"
                />
                <button type="submit">Save profile</button>
              </form>
            )}

            <form onSubmit={handleProjectCreate} className="form">
              <label className="sr-only" htmlFor="project-title">
                Project title
              </label>
              <input
                id="project-title"
                value={projectDraft.title}
                onChange={(event) =>
                  setProjectDraft({ ...projectDraft, title: event.target.value })
                }
                required
                placeholder="Project title"
              />
              <label className="sr-only" htmlFor="project-description">
                Project description
              </label>
              <textarea
                id="project-description"
                value={projectDraft.description}
                onChange={(event) =>
                  setProjectDraft({ ...projectDraft, description: event.target.value })
                }
                required
                placeholder="Project description"
              />
              <label className="sr-only" htmlFor="project-tech-stack">
                Tech stack
              </label>
              <input
                id="project-tech-stack"
                value={projectDraft.techStack}
                onChange={(event) =>
                  setProjectDraft({ ...projectDraft, techStack: event.target.value })
                }
                required
                placeholder="Tech stack"
              />
              <label className="sr-only" htmlFor="project-url">
                Project URL
              </label>
              <input
                id="project-url"
                value={projectDraft.projectUrl}
                onChange={(event) =>
                  setProjectDraft({ ...projectDraft, projectUrl: event.target.value })
                }
                placeholder="Project URL"
              />
              <label className="sr-only" htmlFor="project-repo-url">
                Repository URL
              </label>
              <input
                id="project-repo-url"
                value={projectDraft.repositoryUrl}
                onChange={(event) =>
                  setProjectDraft({ ...projectDraft, repositoryUrl: event.target.value })
                }
                placeholder="Repository URL"
              />
              <button type="submit">Add project</button>
            </form>
          </>
        )}
        {authStatus && (
          <p className={authStatusTone} role={isAuthError ? 'alert' : 'status'} aria-live="polite">
            {authStatus}
          </p>
        )}
      </section>
    </main>
  );
}

export default App;
