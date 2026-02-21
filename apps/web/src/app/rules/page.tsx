export default function RulesPage() {
  return (
    <section className="page-section rules-page">
      <div className="rules-header">
        <h1>Discord Rules</h1>
        <p className="rules-intro">
          These rules apply to our <strong>Discord server</strong>. Welcome to <strong>Ember Studios!</strong>
          To keep this a friendly and professional space for everyone, please follow the guidelines below:
        </p>
      </div>

      <ul className="rules-list">
        <li>
          <strong>Be respectful & professional</strong>
          <blockquote>We&apos;re all here to collaborate, learn, and have a good time. Harassment or toxic behavior won&apos;t fly.</blockquote>
        </li>
        <li>
          <strong>No NSFW or inappropriate content</strong>
          <blockquote>Keep things clean.</blockquote>
        </li>
        <li>
          <strong>No self-promoting or advertising</strong>
          <blockquote>This includes DMs. If you&apos;d like to partner or promote, talk to staff first!</blockquote>
        </li>
        <li>
          <strong>No spam, flooding, or ping abuse</strong>
          <blockquote>Let&apos;s keep the chat readable.</blockquote>
        </li>
        <li>
          <strong>No politics or controversial debates</strong>
          <blockquote>Please stay on topic.</blockquote>
        </li>
        <li>
          <strong>Respect privacy</strong>
          <blockquote>Don&apos;t share DMs, files, or personal info without consent.</blockquote>
        </li>
        <li>
          <strong>Don&apos;t impersonate staff or partners</strong>
          <blockquote>Pretending to be a member of staff is an instant ban.</blockquote>
        </li>
        <li>
          <strong>No leaked or pirated content</strong>
          <blockquote>Share only what you own or have rights to.</blockquote>
        </li>
        <li>
          <strong>English only in main channels</strong>
          <blockquote>To keep moderation smooth and collaboration open, please use English in public chats.</blockquote>
        </li>
      </ul>

      <div className="rules-notes">
        <h2>Additional Notes</h2>
        <blockquote>Follow Discord&apos;s Terms of Service and Community Guidelines.</blockquote>
      </div>

      <p className="rules-signature">
        Best regards,
        <br />
        Ember Studios Team
      </p>
    </section>
  )
}
