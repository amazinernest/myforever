import { loveStory } from '../config/loveStory';

export interface ProposalEvent {
  decision: 'YES' | 'LET_ME_THINK';
  timestamp: string;
  userAgent?: string;
  timeOnPageSeconds?: number;
  note?: string;
}

/**
 * Sends a silent notification whenever Praise interacts with the proposal buttons.
 * Supports:
 * 1. Formspree / Email Endpoint (email straight to your inbox)
 * 2. Telegram Bot Webhook / Discord Webhook (instant notification on your phone)
 * 3. Custom Webhook API
 */
export async function sendDecisionNotification(event: ProposalEvent): Promise<void> {
  const webhookUrl = loveStory.notificationConfig?.webhookUrl;
  const formspreeEndpoint = loveStory.notificationConfig?.formspreeEndpoint;

  const payload = {
    event: 'PROPOSAL_DECISION',
    herName: loveStory.herName,
    myName: loveStory.myName,
    decision: event.decision === 'YES' ? '💍 YES! SHE SAID YES ❤️' : '💭 LET ME THINK 😌',
    timestamp: new Date().toISOString(),
    localTime: new Date().toLocaleString(),
    device: navigator.userAgent,
    message: event.decision === 'YES' 
      ? `🎉 Breathtaking news! ${loveStory.herName} tapped YES to your proposal!`
      : `⏳ ${loveStory.herName} tapped "Let me think". She is reading your letter and taking it in.`,
  };

  // 1. Send to Discord / Custom Webhook if configured
  if (webhookUrl) {
    try {
      // If Discord Webhook URL format
      if (webhookUrl.includes('discord.com/api/webhooks')) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `💍 **PROPOSAL ALERT for ${loveStory.myName} & ${loveStory.herName}**\n\n**Decision:** ${payload.decision}\n**Time:** ${payload.localTime}\n**Message:** ${payload.message}`,
            embeds: [
              {
                title: `${loveStory.herName}'s Proposal Response`,
                color: event.decision === 'YES' ? 0xE5C158 : 0xDE5B7E,
                fields: [
                  { name: 'Decision', value: payload.decision, inline: true },
                  { name: 'Recipient', value: loveStory.herName, inline: true },
                  { name: 'Sender', value: loveStory.myName, inline: true },
                  { name: 'Timestamp', value: payload.localTime, inline: false },
                ],
              },
            ],
          }),
        });
      } else {
        // Standard JSON Webhook
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
    } catch (err) {
      console.warn('Silent notification dispatched (custom webhook):', err);
    }
  }

  // 2. Send to Formspree Email Endpoint if configured
  if (formspreeEndpoint) {
    try {
      await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.warn('Silent notification dispatched (formspree):', err);
    }
  }
}
